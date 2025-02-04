import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import axios from 'axios'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const Aboutus = props => {
  const [aboutus, setAboutus] = useState([])
  const [paragraphList, setParagraphList] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState('')

  /**
   * A nested function that fetches aboutus from the back-end server.
   */
  const fetchAboutus = () => {
    axios
      .get(`${process.env.REACT_APP_SERVER_HOSTNAME}/aboutus`)
      .then(response => {
        // axios bundles up all response data in response.data property
        const aboutus = response.data
        setAboutus(aboutus)
        setParagraphList(aboutus.paragraphs.map(paragraph => (<p>{paragraph}</p>)))
      })
      .catch(err => {
        const errMsg = JSON.stringify(err, null, 2) // convert error object to a string so we can simply dump it to the screen
        setError(errMsg)
      })
      .finally(() => {
        // the response has been received, so remove the loading icon
        setLoaded(true)
      })
  }

   // set up loading data from server when the component first loads
   useEffect(() => {
    // fetch messages this once
    fetchAboutus()
  }, []) // putting a blank array as second argument will cause this function to run only once when component first loads

  return (
    <>
      <h1>About Us</h1>
      {paragraphList}
      <img src={aboutus.photo} alt="photo" />
    </>
  )
}

// make this component available to be imported into any other file
export default Aboutus
