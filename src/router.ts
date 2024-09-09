import { Router } from "express";
import { body, oneOf } from "express-validator"
import { handleInputErrors } from "./modules/middleware";

const router = Router()

// Product
router.get("/product", (req, res) => {
    res.status(200).json("product")
})
router.get("/product/:id", () => { })
router.put("/product/:id", body("name").isString().withMessage("Name is required"), handleInputErrors, (req, res) => {

})
router.post("/product", body("name").isString().withMessage("Name is required"), handleInputErrors, () => { })
router.delete("/product/:id", () => { })

// Update
router.get("/update", () => { })
router.get("/update/:id", () => { })
router.put("/update/:id",
    body('title').exists().isString(),
    body('body').exists().isString(),
    body('status').isIn(['IN_PROGRESS', 'SHIPPED', 'DEPRECATED']).optional(),
    body('version').optional(),
    () => { })
router.post("/update",
    body('title').exists().isString(),
    body('body').exists().isString(),
    () => { })
router.delete("/update/:id", () => { })

// Update Point
router.get("/update-point", () => { })
router.get("/update-point/:id", () => { })
router.put("/update-point/:id",
    body('name').optional().isString(),
    body('description').optional().isString(),
    () => { })
router.post("/update-point",
    body('name').isString(),
    body('description').isString(),
    body('updateId').exists().isString(),
    () => { })
router.delete("/update-point/:id", () => { })


export default router