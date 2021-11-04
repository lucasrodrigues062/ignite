import { useState } from 'react'
import { Dashboard } from './components/Dashboard/index'
import { Header } from './components/Header/index'
import { NewTransactionModal } from './components/NewTransactionModal'
import { GlobalStyle } from './styles/global'
import { TransactionsProvider } from './hooks/useTransaction'


export function App() {

  const [isNewTransacatioModalOpen, setIsNewTransacatioModalOpen] = useState(false)

  function handleOpenNewTransactionModal() {
    setIsNewTransacatioModalOpen(true)
  }

  function handleCloseNewTransactionModal(){
    setIsNewTransacatioModalOpen(false)
  }

  return (
      <TransactionsProvider>
      <Header onOpenNewTransactionalModal= {handleOpenNewTransactionModal} />
      <Dashboard/>
      
      <NewTransactionModal 
        isOpen = {isNewTransacatioModalOpen}
        onRequestClose = {handleCloseNewTransactionModal}
      />
      <GlobalStyle />
      </TransactionsProvider>    
  );
}


