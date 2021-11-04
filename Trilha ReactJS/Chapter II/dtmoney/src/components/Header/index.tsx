
import logoImg from '../../assets/logo.svg'
import { Container, Content } from './styles'


interface HeaderProps {
  onOpenNewTransactionalModal: () => void
}

export function Header({ onOpenNewTransactionalModal }: HeaderProps) {


  return (
    <Container>
      <Content>
        <img src={logoImg} alt="dt money" />
        <button type="button" onClick={onOpenNewTransactionalModal}>
          Nova transação
        </button>


      </Content>
    </Container>
  )
}