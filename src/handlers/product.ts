import prisma from "../db"

// @desc    Get products
// @route   GET /api/product
// @access  Private
export const getProducts = async (req, res) => {
    const user = await prisma.user.findUnique({
        where: {
            id: req.user.id
        },
        include: {
            products: true
        }
    })

    res.status(200).json({ data: user.products })
}

// @desc    Get product
// @route   GET /api/product/:id
// @access  Private
export const getOneProduct = async (req, res) => {
    const id = req.params.id

    const product = await prisma.product.findFirst({
        where: {
            id,
            belongsToId: req.user.id
        }
    })

    res.status(200).json({ data: product })
}

// @desc    Create product
// @route   POST /api/product
// @access  Private
export const createProduct = async (req, res) => {
    const product = await prisma.product.create({
        data: {
            name: req.body.name,
            belongsToId: req.user.id
        }
    })

    res.status(201).json({ data: product })
}

// @desc    Update product
// @route   PUT /api/product/:id
// @access  Private
export const updateProduct = async (req, res) => {
    const id = req.params.id

    const updated = await prisma.product.update({
        where: {
            id,
            belongsToId: req.user.id
        },
        data: {
            name: req.body.name,
        }
    })

    res.status(200).json({ data: updated })
}

// @desc    Delete product
// @route   DELETE /api/product/:id
// @access  Private
export const deleteProduct = async (req, res) => {
    const deleted = await prisma.product.delete({
        where: {
            id: req.params.id,
            belongsToId: req.user.id
        }
    })

    res.status(200).json({ data: deleted })
}