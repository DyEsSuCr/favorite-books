import { Books } from '../models/Books.js'

export const getBook = async (req, res) => {
  const { id } = req.params

  try {
    const book = await Books.findOne({
      where: {
        id,
      },
      attributes: {
        exclude: ['state'],
      },
    })

    if (book.length <= 0) return res.status(200).json({ messaje: 'No hay Libros' })

    res.status(200).json(book)
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

export const getBooks = async (req, res) => {
  try {
    const books = await Books.findAll({
      where: {
        state: true,
      },
      attributes: {
        exclude: ['state'],
      },
    })

    res.status(200).json(books)
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

export const postBooks = async (req, res) => {
  try {
    const { tittle, subtitle } = req.body

    const newBook = await Books.create({
      tittle,
      subtitle,
      image: `http://localhost:3000/images/${req.file.filename}`,
    })

    res.json(newBook)
  } catch (err) {
    res.status(404).json({ error: err })
  }
}

export const putBooks = async (req, res) => {
  res.json({ messaje: 'PUT Books' })
}

export const delBooks = async (req, res) => {
  const { id } = req.params

  try {
    const book = await Books.findByPk(id)

    book.state = false

    await book.save()

    res.status(200).json({ messaje: 'Eliminado' })
  } catch (err) {
    res.status(404).json({ error: err })
  }
}
