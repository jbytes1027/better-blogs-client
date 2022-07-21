import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom/extend-expect"
import PostForm from "./PostForm"
import userEvent from "@testing-library/user-event"

test("<PostForm /> updates parent state and calls onSubmit", async () => {
  const createPostCallback = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<PostForm callback={createPostCallback} />)

  const titleInput = container.querySelector("#post-title-input")
  const authorInput = container.querySelector("#post-author-input")
  const urlInput = container.querySelector("#post-url-input")
  const createButton = screen.getByText("create")

  await user.type(titleInput, "test title")
  await user.type(authorInput, "test author")
  await user.type(urlInput, "test url")
  await user.click(createButton)

  expect(createPostCallback.mock.calls).toHaveLength(1)
  expect(createPostCallback.mock.calls[0][0]).toStrictEqual({
    title: "test title",
    author: "test author",
    url: "test url",
    likes: 0,
  })
})
