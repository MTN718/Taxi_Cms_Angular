import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { GetRowsResult, BackendService } from '../@services/backend/backend.service';
import { GetRowsDto } from '../@models/get.rows.dto';

@Injectable({
    providedIn: 'root'
})
export class TableResolver implements Resolve<GetRowsResult<any>> {
    async resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<GetRowsResult<any>> {
        let reserved = ['orderBy', 'page', 'pageSize', 'refresh'];
        let query: GetRowsDto = { table: route.data.table, filters: {}, relations: route.data.relations ?? [] };
        if (route.queryParamMap.keys != null) {
            for (let param of route.queryParamMap.keys) {
                if (reserved.includes(param))
                    continue;
                query.filters[param] = route.queryParamMap.get(param);
            }
        }
        if (route.queryParamMap.get('orderBy') != null) {
            let s = route.queryParamMap.get('orderBy').split(',');
            query.sort = { property: s[0], direction: s[1] == 'ascend' ? 'ASC' : 'DESC' }
        }
        query.page = route.queryParamMap.get('page') != null ? parseInt(route.queryParamMap.get('page')) : 1;
        query.pageSize = route.queryParamMap.get('pageSize') != null ? parseInt(route.queryParamMap.get('pageSize')) : 10;
        return this.backend.getRows<any>(query);
    }

    constructor(private backend: BackendService) {
     }
}