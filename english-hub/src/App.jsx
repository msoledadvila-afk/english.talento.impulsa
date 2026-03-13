import { Routes, Route } from 'react-router-dom'
import Header from './components/Header.jsx'
import Footer from './components/Footer.jsx'
import Home from './pages/Home.jsx'
import VocabCategories from './pages/VocabCategories.jsx'
import WordList from './pages/WordList.jsx'
import Grammar from './pages/Grammar.jsx'
import Tenses from './pages/Tenses.jsx'
import PhrasalVerbs from './pages/PhrasalVerbs.jsx'
import Expressions from './pages/Expressions.jsx'
import Writing from './pages/Writing.jsx'
import Idioms from './pages/Idioms.jsx'
import Favorites from './pages/Favorites.jsx'

export default function App() {
  return (
    <>
      <Header />
      <main className="page-content">
        <Routes>
          <Route path="/"                      element={<Home />} />
          <Route path="/vocabulary"            element={<VocabCategories />} />
          <Route path="/vocabulary/:category"  element={<WordList />} />
          <Route path="/grammar"               element={<Grammar />} />
          <Route path="/tenses"                element={<Tenses />} />
          <Route path="/phrasal-verbs"         element={<PhrasalVerbs />} />
          <Route path="/expressions"           element={<Expressions />} />
          <Route path="/writing"               element={<Writing />} />
          <Route path="/idioms"                element={<Idioms />} />
          <Route path="/favorites"             element={<Favorites />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}
