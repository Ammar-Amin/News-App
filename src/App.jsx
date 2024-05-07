import { useEffect, useState } from 'react'
import './App.css'
import { news } from './data'

function App() {
  const [data, setData] = useState([])
  const [input, setInput] = useState('')

  let newsData = input !== '' ? news.filter(data => data.description.toLowerCase().includes(input) == input.toLowerCase()) : [...news]

  const handleSubmit = (e) => {
    e.preventDefault()
    setInput('')
  }

  let apiKey = '4bf4addcee3148e7905f4137aa0f85ad'
  let url = `https://newsapi.org/v2/everything?q=apple&
from=2024-05-05&
to=2024-05-05&
sortBy=popularity&
apiKey=${apiKey}`

  async function fetchData() {
    try {
      let res = await fetch(url)
      let resData = await res.json();
      console.log(resData.articles)
      setData(resData.articles);
    }
    catch (e) {
      console.error(e.message, e)
    }
  }

  useEffect(() => {
    // fetchData()
  }, [])

  return (
    <div className='w-full py-8 bg-slate-950 text-white'>
      <h1 className='text-center text-4xl font-medium'>News App</h1>
      <form onSubmit={handleSubmit} className='w-[300px] sm:w-[400px] mx-auto my-6 flex'>
        <input type='text' className='flex-1 py-1 px-3 text-black border-none outline-none rounded-l-lg' placeholder='Category' value={input} onChange={(e) => setInput(e.target.value)} />
        <input type='submit' className='px-4 py-1 font-bold bg-blue-500 hover:bg-blue-600 rounded-r-lg' value='Search' />
      </form>
      <div className='w-[90%] mx-auto flex flex-col gap-4'>
        {/* {
          data && data.length
            ? data.map((article, i) => <div>
              <div key={i}
                className='p-4 bg-slate-800 border-2 border-slate-400'>
                <img src={article.urlToImage} alt={article.source.name}
                  className='w-24 h-24 object-cover mx-auto'
                />
                <div className='flex flex-col gap-1'>
                  <h2 className='text-3xl'>{article.author}</h2>
                  <h3 className='text-2xl'>{article.title}</h3>
                  <h4 className='text-xl'>{article.description}</h4>
                </div>
              </div>
            </div>)
            : <h1 className='text-2xl'>Loading...</h1>
        } */}
        {
          newsData.length > 0 ? newsData.map((item, i) => (<div key={i}>
            <div className='p-4 md:flex md:items-center md:gap-9 bg-slate-800 border-2 border-slate-400'>
              <img src={item.urlToImage} alt={item.source.name}
                className='w-full md:w-24 md:h-24 object-cover mx-auto' />
              <div className='mt-4 md:mt-0 flex flex-1 flex-col gap-1'>
                <h3 className='text-xl'>{item.title}</h3>
                <h4 className='text-slate-200'>{item.description}</h4>
              </div>
            </div>
          </div>
          )) : <div>Loading</div>
        }
      </div>
    </div>
  )
}

export default App
