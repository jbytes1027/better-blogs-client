import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Post from "./Post"

test("renders content", () => {
  const post = {
    title: "test title",
    author: "test author",
    likes: 2,
    user: {
      username: "testUsername",
    },
  }

  const user = {
    username: "testUsername",
  }

  const { container } = render(
    <Post post={post} handleUpdatePosts={() => { }} user={user} />
  )
  const div = container.querySelector(".post")
  expect(div).toHaveTextContent("test title")
})

test()
