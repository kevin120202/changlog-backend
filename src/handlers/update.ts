import prisma from "../db"

// @desc    Get updates
// @route   GET /api/update
// @access  Private
export const getUpdates = async (req, res) => {
    const products = await prisma.product.findMany({
        where: {
            belongsToId: req.user.id
        },
        include: {
            updates: true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.updates]
    }, [])

    res.status(200).json({ data: updates })
}

// @desc    Get one update
// @route   GET /api/update/:id
// @access  Private
export const getOneUpdate = async (req, res) => {
    const update = await prisma.update.findUnique({
        where: {
            id: req.params.id
        }
    })

    res.status(200).json({ data: update })
}

// @desc    Create update
// @route   PUT /api/update
// @access  Private
export const createUpdate = async (req, res) => {
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

// @desc    Update update
// @route   PUT /api/update/:id
// @access  Private
export const updateUpdate = async (req, res) => {
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

// @desc    Delete update
// @route   DELETE /api/update/:id
// @access  Private
export const deleteUpdate = async (req, res) => {
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
