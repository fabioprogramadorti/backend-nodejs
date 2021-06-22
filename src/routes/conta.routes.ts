import { Router } from 'express'
import {
  deposito,
  saque
} from '../controllers/conta.controllers'

const router = Router()


router.put('/deposito/:id', deposito)
router.put('/saque/:id', saque)

export default router