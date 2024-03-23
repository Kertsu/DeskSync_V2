import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
declare const imageMapResize: any;
@Component({
  selector: 'app-step-2',
  templateUrl: './step-2.component.html',
  styleUrl: './step-2.component.css'
})
export class Step2Component implements OnInit {
  area: number = 1;
  subscription!: Subscription;
  date: Date[] | undefined;
  selectedDesk!: number | undefined;
  selectedDate!: any;
  formGroup!: FormGroup;
  options: any[] = [];

  areaDataList = [
    {
      id: 1,
      imagePath: '../../assets/images/map/Area 1 Numbered.png',
      desks: [
        {
          deskNumber: 1,
          alt: 'Desk 1',
          title: 'Desk 1',
          coords: '135,1348,15,1168',
        },
        {
          deskNumber: 2,
          alt: 'Desk 2',
          title: 'Desk 2',
          coords: '140,1168,258,1348',
        },
        {
          deskNumber: 3,
          alt: 'Desk 3',
          title: 'Desk 3',
          coords: '260,1169,382,1348',
        },
        {
          deskNumber: 4,
          alt: 'Desk 4',
          title: 'Desk 4',
          coords: '642,1168,761,1346',
        },
        {
          deskNumber: 5,
          alt: 'Desk 5',
          title: 'Desk 5',
          coords: '763,1169,884,1346',
        },
        {
          deskNumber: 6,
          alt: 'Desk 6',
          title: 'Desk 6',
          coords: '887,1171,1007,1347',
        },
        {
          deskNumber: 7,
          alt: 'Desk 7',
          title: 'Desk 7',
          coords: '102,12,282,153',
        },
        {
          deskNumber: 8,
          alt: 'Desk 8',
          title: 'Desk 8',
          coords: '102,156,282,294',
        },
        {
          deskNumber: 9,
          alt: 'Desk 9',
          title: 'Desk 9',
          coords: '102,298,282,436',
        },
        {
          deskNumber: 10,
          alt: 'Desk 10',
          title: 'Desk 10',
          coords: '102,440,284,579',
        },
        {
          deskNumber: 11,
          alt: 'Desk 11',
          title: 'Desk 11',
          coords: '285,13,465,153',
        },
        {
          deskNumber: 12,
          alt: 'Desk 12',
          title: 'Desk 12',
          coords: '285,155,465,295',
        },
        {
          deskNumber: 13,
          alt: 'Desk 13',
          title: 'Desk 13',
          coords: '286,297,465,437',
        },
        {
          deskNumber: 14,
          alt: 'Desk 14',
          title: 'Desk 14',
          coords: '286,439,466,578',
        },
        {
          deskNumber: 15,
          alt: 'Desk 15',
          title: 'Desk 15',
          coords: '552,14,735,155',
        },
        {
          deskNumber: 16,
          alt: 'Desk 16',
          title: 'Desk 16',
          coords: '552,157,734,296',
        },
        {
          deskNumber: 17,
          alt: 'Desk 17',
          title: 'Desk 17',
          coords: '552,298,734,439',
        },
        {
          deskNumber: 18,
          alt: 'Desk 18',
          title: 'Desk 18',
          coords: '552,440,734,580',
        },
        {
          deskNumber: 19,
          alt: 'Desk 19',
          title: 'Desk 19',
          coords: '736,14,917,155',
        },
        {
          deskNumber: 20,
          alt: 'Desk 20',
          title: 'Desk 20',
          coords: '736,156,917,296',
        },
        {
          deskNumber: 21,
          alt: 'Desk 21',
          title: 'Desk 21',
          coords: '736,299,916,439',
        },
        {
          deskNumber: 22,
          alt: 'Desk 22',
          title: 'Desk 22',
          coords: '735,440,917,582',
        },
        {
          deskNumber: 23,
          alt: 'Desk 23',
          title: 'Desk 23',
          coords: '603,789,806,1031',
        },
        {
          deskNumber: 24,
          alt: 'Desk 24',
          title: 'Desk 24',
          coords: '807,791,1008,1029',
        },
        {
          deskNumber: 25,
          alt: 'Desk 25',
          title: 'Desk 25',
          coords: '214,1028,420,788',
        },
        {
          deskNumber: 26,
          alt: 'Desk 26',
          title: 'Desk 26',
          coords: '14,787,213,1028',
        }
      ],
    },
    {
      id: 2,
      imagePath: '../../assets/images/map/Area 2 Numbered.png',
      desks: [
        {
          deskNumber: 27,
          alt: 'Desk 27',
          title: 'Desk 27',
          coords: '8,313,144,174',
        },
        {
          deskNumber: 28,
          alt: 'Desk 28',
          title: 'Desk 28',
          coords: '296,173,158,310',
        },
        {
          deskNumber: 29,
          alt: 'Desk 29',
          title: 'Desk 29',
          coords: '437,174,299,310',
        },
        {
          deskNumber: 30,
          alt: 'Desk 30',
          title: 'Desk 30',
          coords: '448,173,588,312',
        },
        {
          deskNumber: 31,
          alt: 'Desk 31',
          title: 'Desk 31',
          coords: '590,173,727,310',
        },
        {
          deskNumber: 32,
          alt: 'Desk 32',
          title: 'Desk 32',
          coords: '739,172,880,311',
        },
        {
          deskNumber: 33,
          alt: 'Desk 33',
          title: 'Desk 33',
          coords: '9,326,145,463',
        },
        {
          deskNumber: 34,
          alt: 'Desk 34',
          title: 'Desk 34',
          coords: '159,323,297,463',
        },
        {
          deskNumber: 35,
          alt: 'Desk 35',
          title: 'Desk 35',
          coords: '298,323,438,463',
        },
        {
          deskNumber: 36,
          alt: 'Desk 36',
          title: 'Desk 36',
          coords: '449,323,587,463',
        },
        {
          deskNumber: 37,
          alt: 'Desk 37',
          title: 'Desk 37',
          coords: '590,322,730,463',
        },
        {
          deskNumber: 38,
          alt: 'Desk 38',
          title: 'Desk 38',
          coords: '741,324,879,465',
        },
        {
          deskNumber: 39,
          alt: 'Desk 39',
          title: 'Desk 39',
          coords: '8,628,148,768',
        },
        {
          deskNumber: 40,
          alt: 'Desk 40',
          title: 'Desk 40',
          coords: '159,629,297,768',
        },
        {
          deskNumber: 41,
          alt: 'Desk 41',
          title: 'Desk 41',
          coords: '298,630,436,767',
        },
        {
          deskNumber: 42,
          alt: 'Desk 42',
          title: 'Desk 42',
          coords: '449,629,587,767',
        },
        {
          deskNumber: 43,
          alt: 'Desk 43',
          title: 'Desk 43',
          coords: '589,628,727,767',
        },
        {
          deskNumber: 44,
          alt: 'Desk 44',
          title: 'Desk 44',
          coords: '739,629,878,769',
        },
        {
          deskNumber: 45,
          alt: 'Desk 45',
          title: 'Desk 45',
          coords: '6,780,146,919',
        },
        {
          deskNumber: 46,
          alt: 'Desk 46',
          title: 'Desk 46',
          coords: '158,780,296,920',
        },
        {
          deskNumber: 47,
          alt: 'Desk 47',
          title: 'Desk 47',
          coords: '299,780,439,920',
        },
        {
          deskNumber: 48,
          alt: 'Desk 48',
          title: 'Desk 48',
          coords: '450,781,588,920',
        },
        {
          deskNumber: 49,
          alt: 'Desk 49',
          title: 'Desk 49',
          coords: '589,781,726,919',
        },
        {
          deskNumber: 50,
          alt: 'Desk 50',
          title: 'Desk 50',
          coords: '740,781,880,918',
        },
        {
          deskNumber: 51,
          alt: 'Desk 51',
          title: 'Desk 51',
          coords: '9,1087,298,1283',
        },
        {
          deskNumber: 52,
          alt: 'Desk 52',
          title: 'Desk 52',
          coords: '304,1091,592,1279',
        },
        {
          deskNumber: 53,
          alt: 'Desk 53',
          title: 'Desk 53',
          coords: '600,1089,887,1281',
        }
      ],
    },
    {
      id: 3,
      imagePath: '../../assets/images/map/Area 3 Numbered.png',
      desks: [
        {
          deskNumber: 54,
          alt: 'Desk 54',
          title: 'Desk 54',
          coords: '152,179,293,319',
        },
        {
          deskNumber: 55,
          alt: 'Desk 55',
          title: 'Desk 55',
          coords: '304,179,442,319',
        },
        {
          deskNumber: 56,
          alt: 'Desk 56',
          title: 'Desk 56',
          coords: '441,179,583,321',
        },
        {
          deskNumber: 57,
          alt: 'Desk 57',
          title: 'Desk 57',
          coords: '595,179,733,319',
        },
        {
          deskNumber: 58,
          alt: 'Desk 58',
          title: 'Desk 58',
          coords: '735,180,873,319',
        },
        {
          deskNumber: 59,
          alt: 'Desk 59',
          title: 'Desk 59',
          coords: '886,180,1022,321',
        },
        {
          deskNumber: 60,
          alt: 'Desk 60',
          title: 'Desk 60',
          coords: '153,333,293,472',
        },
        {
          deskNumber: 61,
          alt: 'Desk 61',
          title: 'Desk 61',
          coords: '305,331,443,472',
        },
        {
          deskNumber: 62,
          alt: 'Desk 62',
          title: 'Desk 62',
          coords: '443,333,584,472',
        },
        {
          deskNumber: 63,
          alt: 'Desk 63',
          title: 'Desk 63',
          coords: '597,331,732,472',
        },
        {
          deskNumber: 64,
          alt: 'Desk 64',
          title: 'Desk 64',
          coords: '736,331,872,471',
        },
        {
          deskNumber: 65,
          alt: 'Desk 65',
          title: 'Desk 65',
          coords: '886,330,1024,472',
        },
        {
          deskNumber: 66,
          alt: 'Desk 66',
          title: 'Desk 66',
          coords: '153,637,293,776',
        },
        {
          deskNumber: 67,
          alt: 'Desk 67',
          title: 'Desk 67',
          coords: '305,636,442,776',
        },
        {
          deskNumber: 68,
          alt: 'Desk 68',
          title: 'Desk 68',
          coords: '445,637,583,775',
        },
        {
          deskNumber: 69,
          alt: 'Desk 69',
          title: 'Desk 69',
          coords: '594,636,732,775',
        },
        {
          deskNumber: 70,
          alt: 'Desk 70',
          title: 'Desk 70',
          coords: '735,636,873,775',
        },
        {
          deskNumber: 71,
          alt: 'Desk 71',
          title: 'Desk 71',
          coords: '887,635,1021,776',
        },
        {
          deskNumber: 72,
          alt: 'Desk 72',
          title: 'Desk 72',
          coords: '153,788,293,927',
        },
        {
          deskNumber: 73,
          alt: 'Desk 73',
          title: 'Desk 73',
          coords: '305,787,443,927',
        },
        {
          deskNumber: 74,
          alt: 'Desk 74',
          title: 'Desk 74',
          coords: '445,787,583,928',
        },
        {
          deskNumber: 75,
          alt: 'Desk 75',
          title: 'Desk 75',
          coords: '596,787,734,929',
        },
        {
          deskNumber: 76,
          alt: 'Desk 76',
          title: 'Desk 76',
          coords: '735,788,874,929',
        },
        {
          deskNumber: 77,
          alt: 'Desk 77',
          title: 'Desk 77',
          coords: '885,791,1025,928',
        },
        {
          deskNumber: 78,
          alt: 'Desk 78',
          title: 'Desk 78',
          coords: '146,1099,435,1291',
        },
        {
          deskNumber: 79,
          alt: 'Desk 79',
          title: 'Desk 79',
          coords: '443,1099,730,1289',
        },
        {
          deskNumber: 80,
          alt: 'Desk 80',
          title: 'Desk 80',
          coords: '735,1099,1024,1291',
        }
      ],
    },
    
  ];
  desks: any[] = [];
  desk!: any;
  reservations: any[] = [];

  isLoading: boolean = true;

  minDate!: Date;
  maxDate!: Date;

  ngOnInit(): void {
    setTimeout(() => {
      imageMapResize();
    }, 300);
  }

  handleSelectDesk(desk: any){
    console.log(desk)
  }

}
