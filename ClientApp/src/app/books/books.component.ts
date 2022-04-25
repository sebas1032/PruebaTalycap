import { HttpClient } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { authorsI } from '../interfaces/authors.interface';
import { autoresylibrosI } from '../interfaces/autoresylibros.interface';
import { booksI } from '../interfaces/books.interface';
import { Servicio1Service } from '../servicios/servicio1.service';
import { ViewChild, ElementRef } from "@angular/core";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnDestroy, OnInit {

  bookslista: booksI[];
  authorslista: authorsI[];
  autoresylibros: autoresylibrosI[] = [];

  @ViewChild("exampleModal") myNameElem: ElementRef;

  dom: 'Bfrtip'
  dtOptions: any = {};
  dtTrigger = new Subject<any>();
  data: any;
  displayStyle = "none";

  constructor(private service: Servicio1Service, private router: Router, private http: HttpClient) { }

  ngOnInit(): void {

    

     
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.5/i18n/es-ES.json'
      },
      dom: 'Bfrtip',
      buttons: [   
        'excel',
        //{
        //  text: 'Some button',
        //  key: '1',
        //   action: function (e, dt, node, config) {
        //    alert('Button activated');
        //  }
        //}
      ]
    };

    this.CargarBooks();
    /*this.CargarAuthors();*/
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  CargarBooks() {
    this.service.ObtenerBooks().subscribe(response => {
      console.log(response)
      this.bookslista = response
      this.CargarAuthors();

      //inicializa el data table
      //this.data = this.bookslista;
      //this.dtTrigger.next();


    })

  }

  CargarAuthors() {
    this.service.ObtenerAuthors().subscribe(response => {
      console.log(response)
      this.authorslista = response
      this.UnionDatos();
    })
  }

  UnionDatos() {   

    var firstname1: string="";
    var lastname1: string="";   
    

    for (let itembookslista of this.bookslista) {     

      for (let itemauthorslista of this.authorslista) {
        if (itemauthorslista.idBook == itembookslista.id) {
          firstname1 = itemauthorslista.firstName;
          lastname1 = itemauthorslista.lastName;
          break
        }
      }

      this.autoresylibros.push({
        id: itembookslista.id,
        title: itembookslista.title,
        description: itembookslista.description,
        pageCount: itembookslista.pageCount,
        excerpt: itembookslista.excerpt,
        publishDate: itembookslista.publishDate,
        firstname: firstname1,
        lastname: lastname1
      });
    }
    console.log(this.autoresylibros);

    //inicializa el data table
   this.data = this.autoresylibros;
    this.dtTrigger.next();

    this.displayStyle = "block";
    
  }
  closePopup() {
    this.displayStyle = "none";
  }


}

