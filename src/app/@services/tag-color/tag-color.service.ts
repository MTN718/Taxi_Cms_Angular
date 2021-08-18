import { Injectable } from '@angular/core';
import { DriverStatus } from 'src/app/@models/entities/driver';
import { RiderStatus } from 'src/app/@models/entities/rider';
import { RequestStatus } from 'src/app/@models/entities/request';
import { PaymentRequestStatus } from 'src/app/@models/entities/payment-request';

@Injectable({
  providedIn: 'root'
})
export class TagColorService {

  constructor() { }

  driver(value: DriverStatus) {
    switch (value) {
      case (DriverStatus.Blocked):
      case (DriverStatus.HardReject):
        return 'error';

      case (DriverStatus.Online):
        return 'processing';

      case (DriverStatus.InService):
        return 'success'

      case (DriverStatus.WaitingDocuments):
      case (DriverStatus.SoftReject):
      case (DriverStatus.Offline):
        return 'default';

      case (DriverStatus.PendingApproval):
        return 'warning';
    }
  }
  rider(value: RiderStatus) {
    switch (value) {
      case (RiderStatus.Blocked):
        return 'error';

      case (RiderStatus.Enabled):
        return 'success';
    }
  }
  request(value: RequestStatus) {
    switch (value) {
      case (RequestStatus.Expired):
        return 'default';

      case (RequestStatus.RiderCanceled):
      case (RequestStatus.DriverCanceled):
      case (RequestStatus.NotFound):
      case (RequestStatus.NoCloseFound):
        return 'error';

      case (RequestStatus.Booked):
        return 'warning';

      case (RequestStatus.Finished):
        return 'success';

      default:
        return 'processing';
    }
  }

  requestBadge(value: RequestStatus) {
    switch (value) {
      case (RequestStatus.RiderCanceled):
      case (RequestStatus.DriverCanceled):
      case (RequestStatus.NotFound):
      case (RequestStatus.NoCloseFound):
      case (RequestStatus.Expired):
        return 'error';

      case (RequestStatus.Booked):
      case (RequestStatus.Started):
      case (RequestStatus.WaitingForPostPay):
      case (RequestStatus.WaitingForReview):
        return 'processing';

      case (RequestStatus.Finished):
        return 'success';

      default:
        return 'default';
    }

  }

  boolean(value: boolean) {
    return value ? 'success' : 'error';
  }

  paymentRequest(value: PaymentRequestStatus) {
    switch(value) {
      case(PaymentRequestStatus.Paid):
        return 'success';
      case(PaymentRequestStatus.Pending):
        return 'warning';
      case(PaymentRequestStatus.Rejected):
        return 'error';
    }
  }
}
