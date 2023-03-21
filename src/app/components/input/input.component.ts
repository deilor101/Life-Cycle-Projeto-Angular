import { Item } from './../../interfaces/iItem';
import { ListaDeCompraService } from './../../service/lista-de-compra.service';
import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit, OnChanges {

  @Input() itemQueVaiSerEditado!: Item;

  editando: boolean = false;
  textoBtn: string = 'Salvar item';
  valorItem! : string;

  constructor(
    private listaService: ListaDeCompraService
  ) { }

  ngOnInit(): void { }


  adicionarItem() {
    this.listaService.adicionarItemNaLista(this.valorItem);
    this.limparCampo();
  }

  limparCampo() {
    this.valorItem = '';
  }

  editarItem() {
    this.listaService.editarItemDaLista(this.itemQueVaiSerEditado, this.valorItem);
    this.limparCampo();
    this.editando = false;
    this.textoBtn = "Salvar item"
  }

  ngOnChanges(changes: SimpleChanges) {
    if(!changes['itemQueVaiSerEditado'].firstChange) {
      this.editando = true;
      this.textoBtn = 'Editar item';
      this.valorItem = this.itemQueVaiSerEditado?.nome;
    }
  }
}
