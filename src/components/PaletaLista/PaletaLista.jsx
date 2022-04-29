import "./PaletaLista.css";
import  { paletas } from "mocks/paletas";
import { useState } from 'react';

function PaletaLista() {

  const [paletaSelecionada, setPaletaSelecionada] = useState ({});
  
  const adicionarItem =(paletaIndex) => {
    const paleta = {[paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) + 1};
    setPaletaSelecionada({...paletaSelecionada, ...paleta});
  }

  const removerItem =(paletaIndex) => {
    const paleta = {[paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) -1};
    setPaletaSelecionada({...paletaSelecionada, ...paleta});
  }

  const badgeCounter = (canRender, index) =>
	Boolean(canRender) && (<span className="PaletaListaItem__badge"> {paletaSelecionada[index]} </span>);

  const removeButton = (canRender, index) =>
	Boolean(canRender) && (<button className="Acoes__remover" onClick={() => removerItem(index)}>remover</button>);

    return (
      <div className="PaletaLista">
      {paletas.map((paleta, index) =>
        <div className="PaletaListaItem" key= {`PaletaListaItem-${index}`}>
          	{badgeCounter(paletaSelecionada[index], index)}
          <div>
              <div className="PaletaListaItem__titulo"> {paleta.titulo} </div>
              <div className="PaletaListaItem__preco">{paleta.preco}</div>
              <div className="PaletaListaItem__descricao"> {paleta.descricao}  </div>
              <div className="PaletaListaItem__acoes Acoes">
              <button className={`Acoes__adicionar ${!paletaSelecionada[index] && "Acoes__adicionar--preencher"}`} onClick={() => adicionarItem(index)}>adicionar</button>
              {removeButton(paletaSelecionada[index], index)}
              </div>
            </div>
            <img className="PaletaListaItem__foto" src={paleta.foto} alt="Paleta de Doce de Leite" />
        </div>
      )}
    </div>
    )
}

export default PaletaLista;

