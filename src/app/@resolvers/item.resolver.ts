import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetRowsDto } from '../@models/get.rows.dto';
import { BackendService } from '../@services/backend/backend.service';

@Injectable({
    providedIn: 'root'
})
export class ItemResolver implements Resolve<any> {
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<any> {
        let id = route.paramMap.get('id');
        let table = route.data.table;
        if (id != null) {
            let query: GetRowsDto = {
                table: table, filters: {
                    id: id
                },
                relations: route.data.relations
            };
            return (await this.backend.getRows<any>(query)).data[0];
        } else {
            return this.backend.retrieveDefault<any>(table);
        }
    }

    constructor(private backend: BackendService) {
     }
}