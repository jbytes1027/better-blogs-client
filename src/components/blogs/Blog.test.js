import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"
import Blog from "./Blog"

test("renders content", () => {
  const blog = {
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
    <Blog blog={blog} handleUpdateBlogs={() => {}} user={user} />
  )
  const div = container.querySelector(".blog")
  expect(div).toHaveTextContent("test title")
})

test()
