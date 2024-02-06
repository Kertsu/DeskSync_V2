import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import * as FileSaver from 'file-saver';
import { Table } from 'primeng/table';
interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}
@Component({
  selector: 'app-logs',
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.css'
})
export class LogsComponent implements OnInit {

  @ViewChild ('dt') dt!: Table;

  selectedStatus = new FormControl()

  loading: boolean = false;

  totalRecords: number = 4;

  trails: any[] = [{
    "_id": {
      "$oid": "658f9035e2c5e80245651d14"
    },
    "user": null,
    "email": "marjorieanito@student.laverdad.edu.ph",
    "actionType": "Login",
    "actionDetails": "Login failed",
    "ipAddress": "64.224.122.135",
    "status": "failure",
    "additionalContext": "Invalid credentials",
    "createdAt":  "2023-12-30T03:36:21.836Z"
    ,
    "updatedAt": "2023-12-30T03:36:21.836Z"
    ,
    "__v": 0
  }, {
    "_id": {
      "$oid": "658f9038e2c5e80245651d17"
    },
    "user": null,
    "email": "marjorieanito@student.laverdad.edu.ph",
    "actionType": "Login",
    "actionDetails": "Login failed",
    "ipAddress": "64.224.122.135",
    "status": "failure",
    "additionalContext": "Invalid credentials",
    "createdAt":"2023-12-30T03:36:24.274Z"
    ,
    "updatedAt":"2023-12-30T03:36:24.274Z"
    ,
    "__v": 0
  },
  {
    "_id": {
      "$oid": "658f96f83a3771b3440c406a"
    },
    "user": {
      "$oid": "65671517eec8a4d2d7c7cf56"
    },
    "email": "kurtddbigtas@gmail.com",
    "actionType": "Logout",
    "actionDetails": "kd logged out",
    "ipAddress": "64.224.99.19",
    "status": "success",
    "createdAt":"2023-12-30T04:05:12.814Z"
    ,
    "updatedAt":"2023-12-30T04:05:12.814Z"
    ,
    "__v": 0
  },{
    "_id": {
      "$oid": "658fd60829ad67639c9fa95f"
    },
    "user": null,
    "email": "kurtddbigtas@gmail.com",
    "actionType": "Login",
    "actionDetails": "Login successful",
    "ipAddress": "64.224.99.19",
    "status": "success",
    "createdAt":"2023-12-30T08:34:16.635Z"
    ,
    "updatedAt":"2023-12-30T08:34:16.635Z"
    ,
    "__v": 0
  }]

  statuses!: any[];

  selectedTrails: any[] = []

  constructor() {}

  cols!: Column[];

  exportColumns!: ExportColumn[];

  ngOnInit() {

    this.statuses = [
      { label: 'Failure', value: 'failure' },
      { label: 'Success', value: 'success' },
  ];

      this.cols = [
          { field: 'createdAt', header: 'Date & Time' },
          { field: 'email', header: 'Name' },
          { field: 'actionType', header: 'Type' },
          { field: 'actionDetails', header: 'Details' },
          { field: 'ipAddress', header: 'IP Address' },
          { field: 'status', header: 'Status' },
          { field: 'additionalContext', header: 'Context', customExportHeader: 'Additional Context' }
      ];

      this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  exportPdf() {
      import('jspdf').then((jsPDF) => {
          import('jspdf-autotable').then((x) => {
              const doc = new jsPDF.default('p', 'px', 'a4');
              const formattedTrails = this.trails.map(trail => ({
                ...trail,
                createdAt: new Date(trail.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
              }));
              (doc as any).autoTable(this.exportColumns, formattedTrails);
              doc.save('trails.pdf');
          });
      });
  }

  exportExcel() {
    import('xlsx').then((xlsx) => {
      const formattedTrails = this.trails.map(trail => {
        const { __v, _id, user, ...rest } = trail;
        return {
          ...rest,
          createdAt: new Date(trail.createdAt).toLocaleString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit' })
        };
      });
  
      const worksheet = xlsx.utils.json_to_sheet(formattedTrails);
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, 'trails');
    });
  }
  

  saveAsExcelFile(buffer: any, fileName: string): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xlsx';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + EXCEL_EXTENSION);
  }

  loadAuditTrails(event : any){
    console.log(event);
  }
  
}
