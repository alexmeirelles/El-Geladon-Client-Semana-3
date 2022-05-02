import "./PaletaLista.css";
import { useState, useEffect } from "react";
import PaletaListaItem from "components/PaletaListaItem/PaletaListaItem";
import { PaletaService } from "services/PaletaService";

function PaletaLista() {
  const [paletas, setPaletas] = useState([]);

  const [paletaSelecionada, setPaletaSelecionada] = useState({});

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
        />
      ))}
    </div>
  );
}

export default PaletaLista;