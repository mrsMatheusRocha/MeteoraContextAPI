import { createContext, useEffect, useMemo, useReducer, useState } from "react";
import { carrinhoReducer } from "../components/reducers/carrinhoReducer";

export const CarrinhoContext = createContext();
CarrinhoContext.displayName = "Carrinho";

const estadoInicial = [];

const CarrinhoProvider = ({children}) => {
  const [carrinho, dispatchCarrinho] = useReducer(carrinhoReducer, estadoInicial)
  const [quantidade, setQuantidade] = useState(0);
  const [valorTotal, setValorTotal] = useState(0);

  const {totalTemp,quantidadeTemp} = useMemo(() => {
    return carrinho.reduce((acumulador, produto) => ({
      quantidadeTemp: acumulador.quantidadeTemp + produto.quantidade,
      totalTemp: acumulador.totalTemp + produto.preco * produto.quantidade,
    }),
    {
      quantidadeTemp: 0,
      totalTemp: 0,
    }
    );
  }, [carrinho]);

  useEffect(() => {
    setQuantidade(quantidadeTemp);
    setValorTotal(totalTemp);
  })


  return (
    <CarrinhoContext.Provider 
      value={{ 
        carrinho, 
        dispatchCarrinho,
        quantidade, 
        valorTotal
      }}>
      {children}
    </CarrinhoContext.Provider>
  )
}

export default CarrinhoProvider;
