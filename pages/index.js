import { Inter } from 'next/font/google'
import Layout from '../components/layouts/Layout'
import NestedLayout from '../components/layouts/NestedLayout'

export default function Page() {
  return (
    <>

    </>
  )
}

Page.getLayout = function getLayout(page) {
  return (
    <Layout>
        {page}
    </Layout>
  )
}