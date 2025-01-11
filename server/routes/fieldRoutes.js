const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");

const {
  getFields,
  getField,
  createField,
  updateField,
  deleteField,
  getNearbyFields,
} = require("../controllers/fieldController");

router.use(protect);

router.route("/").get(getFields).post(createField);

router.route("/nearby").get(getNearbyFields);

router.route("/:id").get(getField).put(updateField).delete(deleteField);

module.exports = router;
