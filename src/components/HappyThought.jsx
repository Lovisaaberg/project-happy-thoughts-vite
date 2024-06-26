import { useState, useEffect } from "react"
import { Header } from "./Header.jsx"
import { HappyThoughtList } from "./HappyThoughtList.jsx"
import { HappyThoughtForm } from "./HappyThoughtForm.jsx"

//Fetch most recent Happy Thoughts with API
export const HappyThought = () => {
  const [thoughts, setThoughts] = useState([])
  const [newThought, setNewThought] = useState("")

  useEffect(() => {
    fetch("https://project-happy-thoughts-api-j0eg.onrender.com/thoughts")
      .then((res) => res.json())
      .then((json) => {
        setThoughts(json.response)
      })
      .catch((error) => {
        console.error("Error fetching Happy Thoughts", error)
      })
  }, [])

  const handleNewThought = (event) => {
    setNewThought(event.target.value)
  }

  //Function to POST new Happy Thoughts
  const onFormSubmit = (event) => {
    event.preventDefault()

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: newThought,
      }),
    }

    fetch(
      "https://project-happy-thoughts-api-j0eg.onrender.com/thoughts",
      options
    )
      .then((res) => res.json())
      .then((newThought) => {
        setThoughts((previousThoughts) => [
          newThought.response,
          ...previousThoughts,
        ])
        setNewThought("")
      })
      .catch((error) => {
        console.error("Error posting Happy Thought:", error)
      })
  }

  return (
    <div>
      <Header />
      <main className="main-wrapper">
        <div className="main-content">
          <HappyThoughtForm
            newThought={newThought}
            onNewThoughtChange={handleNewThought}
            onFormSubmit={onFormSubmit}
          />
          <HappyThoughtList thoughts={thoughts} />
        </div>
      </main>
    </div>
  )
}
