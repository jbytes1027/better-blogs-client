import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"

test("<BlogForm /> updates parent state and calls onSubmit", async () => {
  const createBlogCallback = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<BlogForm callback={createBlogCallback} />)

  const titleInput = container.querySelector("#blog-title-input")
  const authorInput = container.querySelector("#blog-author-input")
  const urlInput = container.querySelector("#blog-url-input")
  const createButton = screen.getByText("create")

  await user.type(titleInput, "test title")
  await user.type(authorInput, "test author")
  await user.type(urlInput, "test url")
  await user.click(createButton)

  expect(createBlogCallback.mock.calls).toHaveLength(1)
  expect(createBlogCallback.mock.calls[0][0]).toStrictEqual({
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 0
  })
})