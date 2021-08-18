import { Injectable } from '@angular/core';
import { SocketService } from '../socket/socket.service';
import CMSException from 'src/app/@models/cms-exception';
import { GetRowsDto } from 'src/app/@models/get.rows.dto';
import { NzMessageService } from 'ng-zorro-antd';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { ActivatedRouteSnapshot } from '@angular/router';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(private message: NzMessageService, private http: HttpClient, private socket: SocketService) {
  }

  getRows<T>(query: GetRowsDto): Promise<GetRowsResult<T>> {
    return new Promise((resolve, reject) => {
      this.socket.emit('getRows', query, (result: CMSException | GetRowsResult<T>) => {
        if (result['status'] != undefined && result['message'] != undefined) {
          reject(result as CMSException);
          this.message.error(result['message']);
        } else {
          resolve(result as GetRowsResult<T>)
        }
      });
    });
  }

  saveRow<T>(table: string, row: {}, showConfirmation: boolean = true, fields: FormlyFieldConfig[] = [], additionalFields: string[] = []): Promise<T> {
    if (fields.length != 0 || additionalFields.length != 0) {
      for (let fName of Object.keys(row)) {
        if (this.getField(fName, fields) == null && !additionalFields.includes(fName) && fName != 'id') {
          delete row[fName];
        }
      }
    }
    return new Promise((resolve, reject) => {
      this.socket.emit('saveRow', { table: table, row: row }, (result: CMSException | T) => {
        if (result['status'] != undefined && result['message'] != undefined) {
          reject(result as CMSException);
          this.message.error(result['message']);
        } else {
          resolve(result as T);
          if (showConfirmation) {
            this.message.success('Saved Successfully');
          }

        }
      });
    })
  }

  deleteRow<T>(table: string, id: number | number[] | {}): Promise<T> {
    return new Promise((resolve, reject) => {
      this.socket.emit('deleteRows', { table: table, criteria: id }, (result: CMSException | T) => {
        if (result['status'] != undefined && result['message'] != undefined) {
          reject(result as CMSException)
          this.message.error(result['message']);
        } else {
          resolve(result as T);
          this.message.success('Deleted Successfully');
        }
      });
    })
  }

  retrieveDefault<T>(table: string): Promise<T> {
    return new Promise((resolve, reject) => {
      this.socket.emit('getDefault', table, (result: T) => {
        resolve(result);
      });
    });
  }

  getField(key: string, fields: FormlyFieldConfig[]): FormlyFieldConfig {
    for (let i = 0, len = fields.length; i < len; i++) {
      const f = fields[i];
      if (f.key === key) {
        return f;
      }
      if (f.fieldGroup && !f.key) {
        const cf = this.getField(key, f.fieldGroup);
        if (cf) {
          return cf;
        }
      }
    }
    return null;
  }

  export(table: string, type: string, route: ActivatedRouteSnapshot) {
    let reserved = ['orderBy', 'page', 'pageSize', 'refresh'];
    let query: any = { table: table, type: type, filters: {} };
    if (route.queryParamMap.keys != null) {
      for (let param of route.queryParamMap.keys) {
        if (reserved.includes(param))
          continue;
        query.filters[param] = route.queryParamMap.get(param);
      }
    }
    if (route.queryParamMap.get('orderBy') != null) {
      let s = route.queryParamMap.get('orderBy').split(',');
      query.sort = { property: s[0], direction: s[1] == 'descend' ? 'DESC' : 'ASC' }
    }
    if(route.data.relations != null) {
      query.relations = route.data.relations;
    }
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      responseType: 'blob' as 'blob'
    };
    this.http.post(`${environment.root}operator/export`, query, httpOptions).subscribe(x => {
      var link = document.createElement('a');
      link.href = window.URL.createObjectURL(x);
      link.download = `export_${table}_${new Date().getTime()}.${type}`;
      link.click();
    })
  }
}

export interface GetRowsResult<T> {
  data: T[];
  count: number;
}