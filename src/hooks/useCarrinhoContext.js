import { useContext } from "react";
import { CarrinhoContext } from "@/context/CarrinhoContext";
import { ADD_PRODUTO, REMOVE_PRODUTO, UPDATE_QUANTIDADE } from "@/components/reducers/CarrinhoReducer";

const addProdutoAction = (novoProduto) => ({
  type: ADD_PRODUTO,
  payload: novoProduto,
})

const removeProdutoAction = (produtoId) => ({
  type: REMOVE_PRODUTO,
  payload: produtoId,
})

const updateProdutoAction = (produtoId, quantidade) => ({
  type: UPDATE_QUANTIDADE,
  payload: {produtoId, quantidade},
})

export const useCarrinhoContext = () => {
  const { carrinho, dispatchCarrinho, quantidade, valorTotal } = useContext(CarrinhoContext);

  function adicionarProduto(novoProduto) {
    dispatchCarrinho(addProdutoAction(novoProduto));
  }

  function removerProduto(id) {
    const produto = carrinho.find((item) => item.id === id);

    if (produto && produto.quantidade > 1) {
      dispatchCarrinho(updateProdutoAction(id, produto.quantidade - 1));
    } else {
      dispatchCarrinho(removeProdutoAction(id));
    }
  }

  function removerProdutoCarrinho(id) {
    dispatchCarrinho(removeProdutoAction(id));
  }

  return {
    carrinho,
    adicionarProduto,
    removerProduto,
    removerProdutoCarrinho,
    valorTotal, 
    quantidade,
  }
}