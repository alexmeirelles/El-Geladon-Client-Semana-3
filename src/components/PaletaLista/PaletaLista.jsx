import "./PaletaLista.css";
import { useState, useEffect } from "react";
import PaletaListaItem from "components/PaletaListaItem/PaletaListaItem";
import { PaletaService } from "services/PaletaService";
import PaletaDetalhesModal from "components/PaletaDetalhesModal/PaletaDetalhesModal";


function PaletaLista() {
  const [paletas, setPaletas] = useState([]);

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

  const [paletaModal, setPaletaModal] = useState(false);

  const paleta = {
    titulo: "Açaí com Leite Condensado",
    descricao:
      "Quam vulputate dignissim suspendisse in est ante in nibh mauris.",
    foto: "assets/images/acai-com-leite-condensado.png",
    preco: 10.0,
    sabor: "Açaí",
    recheio: "Leite Condensado",
    possuiRecheio: true,
  };

  const adicionarItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: (paletaSelecionada[paletaIndex] || 0) + 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const removerItem = (paletaIndex) => {
    const paleta = {
      [paletaIndex]: Number(paletaSelecionada[paletaIndex] || 0) - 1,
    };
    setPaletaSelecionada({ ...paletaSelecionada, ...paleta });
  };

  const getLis = async () => {
    const response = await PaletaService.getLista();
    setPaletas(response);
  };

  useEffect(() => {
    getLis();
  }, []);

  return (
    <div className="PaletaLista">
      {paletas.map((paleta, index) => (
        <PaletaListaItem
           key={`PaletaListaItem-${index}`}
           paleta={paleta}
           quantidadeSelecionada={paletaSelecionada[index]}
           index={index}
           onAdd={(index) => adicionarItem(index)}
      onRemove={(index) => removerItem(index)}
      clickItem={(paletaId) => setPaletaModal(paleta)}
           />
      ))}
     {paletaModal && <PaletaDetalhesModal paleta={paletaModal} closeModal={() => setPaletaModal(false)} />}
    </div>
  );
}

export default PaletaLista;