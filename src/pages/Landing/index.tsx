import ProductList from '@/components/ProductList'

import Sidebar from '../../components/Sidebar/index'
import DefaultLayout from '../../layout/DefaultLayout'

const Landing = () => {
  return (
    <DefaultLayout logo={true}>
      <Sidebar />
      <ProductList />
    </DefaultLayout>
  )
}

export default Landing
