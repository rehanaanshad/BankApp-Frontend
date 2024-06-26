import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import jspdf from 'jspdf';
import 'jspdf-autotable'
@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {

  searchTerm: string='';
  transactions:any=[];
  constructor(private api:ApiService){}
  ngOnInit(): void {
   this.api.transactionHistory().subscribe((result:any)=>{
    console.log(result);//array of transaction
    this.transactions=result.transactions
    console.log(this.transactions);
   },
   (result:any)=>{
    console.log(result.error.message);
   }
  )
  }

  //generate pdf
  generatePdf(){
    //1 create an object for jspdf
    var pdf = new jspdf();

    //2 setup row for the table
    let thead = ['Type','from Account','To Account','Amount']
    let tbody = []

    //3.setup properties for the table
    pdf.setFontSize(16)
    pdf.text('Mini Statement',15,10)

    //4 To display as table,we need to convert array of object into nested array
    for(let item of this.transactions){
      let temp = [item.type,item.fromAcno,item.toAcno,item.amount]//nested array
      tbody.push(temp)
    }
    //5.convert nested array into table structure using jspdf-autotable
    (pdf as any).autoTable(thead,tbody)

    //6.to open pdf in another tab
    pdf.output('dataurlnewwindow')

    //7. T o download/save pdf file
    pdf.save('TransactionHistory.pdf')

  }
}
