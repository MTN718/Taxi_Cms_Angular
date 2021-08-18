import { Component, OnInit, ViewChild, ElementRef, Inject, LOCALE_ID } from '@angular/core';
import { SocketService } from 'src/app/@services/socket/socket.service';
import { Observable } from 'rxjs';
import { Stats } from 'src/app/@models/stats';
import { DriverLocationWithId } from 'src/app/@models/coordinatexy';
import { MapInfoWindow, MapMarker, GoogleMap } from '@angular/google-maps';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  statChange: Observable<any>;
  stats: Stats = new Stats();
  incomeMode = 'year';
  requestMode = 'year';
  autoZoom = false;
  drivers: DriverLocationWithId[];
  selectedDriverId: number;
  @ViewChild(MapInfoWindow, { static: false }) infoWindow: MapInfoWindow;
  @ViewChild(GoogleMap, { static: false }) map: GoogleMap;
  income = {};
  requests = {};

  constructor(private socket: SocketService, @Inject(LOCALE_ID) private locale: string) {
  }

  ngOnInit(): void {
    this.socket.emit('getDriversLocation', null, (result: DriverLocationWithId[]) => {
      this.drivers = result;
      this.centerMap();
    });
    this.socket.fromEvent('driverLocationUpdated').subscribe((x: any) => {
      const index = this.drivers.findIndex(y => y.driverId == x.id);
      if (index < 0) {
        this.drivers.push({ driverId: x.id, location: x.loc });
        this.drivers = this.drivers.slice();
      } else {
        if(x.loc == null) {
          delete this.drivers[index];
        } else {
          this.drivers[index].location = x.loc;
        }
        this.drivers = this.drivers.slice();
      }
      if (this.autoZoom)
        this.centerMap();
    });
    this.socket.emit('getStats', null, (result: Stats) => {
      this.stats = result;
    });
    
    this.socket.fromEvent('statChanged').subscribe((x: any) => {
      this.stats[x.key] += x.value;
    });
    
    this.refreshIncome();
    this.refreshRequests();
  }

  refreshIncome() {
    this.socket.emit('incomeChart', this.incomeMode, (result: IncomeResultItem[]) => {
      let timeFormat = this.getTimeFormatForQuery(this.incomeMode);
      var currencies: { [key: string]: IncomeResultItem } = result.reduce(function (result, item) {
        result[item.currency] = result[item.currency] || [];
        result[item.currency].push(item);
        return result;
      }, {});
      let _times = result.reduce((result, item) => {
        let time = formatDate(item.time, timeFormat, this.locale);
        result[time] = result[time] || [];
        result[time].push(item);
        return result;
      }, {});
      let times = Object.keys(_times);
      let dataset = Object.keys(currencies).map(x => {
        let data = times.map(y => { 
          let f = result.filter(z => { return (z.currency == x && formatDate(z.time, timeFormat, this.locale) == y) })
          return f.length > 0 ? Math.round(f[0].sum) : 0;
         });
        return {
          label: x,
          data: data,
          fill: true,
          backgroundColor: '#71c9ca'
        }
      })
      this.income = {
        labels: times,
        datasets: dataset
      }
    });
  }

  refreshRequests() {
    this.socket.emit('requestsChart', this.requestMode, (result: any[]) => {
      let timeFormat = this.getTimeFormatForQuery(this.requestMode);
      this.requests = {
        labels: result.map(x=>formatDate(x.time, timeFormat, this.locale)),
        datasets: [
          {
            label: 'Requests',
            data: result.map(x => { return x.count}),
            fill: true,
            backgroundColor: '#71c9ca'
        }
      ]
      }
    });
  }

  getTimeFormatForQuery(q: string) {
      switch (q) {
        case ('day'):
          return 'h"';
        case ('week'):
          return 'W,y';
        case ('month'):
          return 'M/d';
        case ('year'):
          return 'MMM y';
      }
  }

  centerMap() {
    if (this.drivers.length == 0) {
      this.map.zoom = 1;
      return;
    }
    if (this.drivers.length == 1) {
      this.map.center = this.drivers[0].location;
      this.map.zoom = 16;
      return;
    }
    const latlngbounds = new google.maps.LatLngBounds();
    for (const location of this.drivers) {
      latlngbounds.extend(location.location);
    }
    this.map.fitBounds(latlngbounds);
  }

  colorForCount(count: number) {
    if (count == 0) {
      return '#87d068';
    } else if (count < 10) {
      return 'orange';
    } else {
      return '#CF1322';
    }
  }

  openInfoWindow(marker: MapMarker) {
    this.selectedDriverId = parseInt(marker.getTitle());
    this.infoWindow.open(marker);
  }

  onSelect(event) {
    console.log(event);
  }
}
interface IncomeResultItem {
  time: number;
  sum: number;
  currency: string;
}