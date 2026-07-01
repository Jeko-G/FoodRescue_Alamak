const express = require("express");
const router = express.Router();
const User = require("../models/user");
const Donation = require("../models/donation");
const Claim = require("../models/claim");
const Report = require("../models/report");
const Notification = require("../models/notification");
const CommunityPost = require("../models/communitypost");
const FoodCategory = require("../models/foodcategory");
const { adminAuth } = require("../middleware/auth");

// GET /api/admin/stats
router.get("/stats", adminAuth, async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({
      role: { $ne: "admin" },
      deleted_at: null,
    });
    const totalProviders = await User.countDocuments({ role: "food_provider" });
    const totalSeekers = await User.countDocuments({ role: "food_seeker" });
    const totalDonations = await Donation.countDocuments({ deleted_at: null });
    const availableDonations = await Donation.countDocuments({
      status: { $in: ["available", "partially_claimed"] },
    });
    const completedDonations = await Donation.countDocuments({
      status: "completed",
    });
    const totalClaims = await Claim.countDocuments();
    const pendingReports = await Report.countDocuments({ status: "pending" });
    const totalPosts = await CommunityPost.countDocuments({ deleted_at: null });

    res.json({
      totalUsers,
      totalProviders,
      totalSeekers,
      totalDonations,
      availableDonations,
      completedDonations,
      totalClaims,
      pendingReports,
      totalPosts,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/users
router.get("/users", adminAuth, async (req, res) => {
  try {
    const users = await User.find({ role: { $ne: "admin" } })
      .select("-password_hash")
      .sort({ created_at: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/users/:id/toggle
router.put("/users/:id/toggle", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    user.is_active = !user.is_active;
    await user.save();
    res.json({
      msg: `User ${user.is_active ? "diaktifkan" : "dinonaktifkan"}`,
    });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/admin/users/:id
router.delete("/users/:id", adminAuth, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
    user.deleted_at = new Date();
    user.is_active = false;
    await user.save();
    res.json({ msg: "User dihapus" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/donations
router.get("/donations", adminAuth, async (req, res) => {
  try {
    const donations = await Donation.find()
      .populate("provider_id", "first_name last_name email")
      .populate("category_id", "name icon_emoji")
      .sort({ created_at: -1 });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// DELETE /api/admin/donations/:id
router.delete("/donations/:id", adminAuth, async (req, res) => {
  try {
    await Donation.findByIdAndUpdate(req.params.id, {
      deleted_at: new Date(),
      status: "cancelled",
    });
    res.json({ msg: "Donasi dihapus oleh admin" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/reports
router.get("/reports", adminAuth, async (req, res) => {
  try {
    const reports = await Report.find()
      .populate("reporter_id", "first_name last_name email")
      .populate("resolved_by", "first_name last_name")
      .sort({ created_at: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/reports/:id/resolve
router.put("/reports/:id/resolve", adminAuth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report)
      return res.status(404).json({ msg: "Laporan tidak ditemukan" });

    report.status = "resolved";
    report.resolved_by = req.user.id;
    report.resolved_at = new Date();
    await report.save();

    res.json({ msg: "Laporan diselesaikan" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/reports/:id/dismiss
router.put("/reports/:id/dismiss", adminAuth, async (req, res) => {
  try {
    const report = await Report.findById(req.params.id);
    if (!report)
      return res.status(404).json({ msg: "Laporan tidak ditemukan" });

    report.status = "dismissed";
    report.resolved_by = req.user.id;
    report.resolved_at = new Date();
    await report.save();

    res.json({ msg: "Laporan di-dismiss" });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/conversations
router.get("/conversations", adminAuth, async (req, res) => {
  try {
    const Conversation = require("../models/conversation");
    const conversations = await Conversation.find()
      .populate("provider_id", "first_name last_name email")
      .populate("seeker_id", "first_name last_name email")
      .populate("donation_id", "title")
      .sort({ last_message_at: -1 });
    res.json(conversations);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/community
router.get("/community", adminAuth, async (req, res) => {
  try {
    const posts = await CommunityPost.find()
      .populate("author_id", "first_name last_name email")
      .sort({ created_at: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// PUT /api/admin/community/:id/pin
router.put("/community/:id/pin", adminAuth, async (req, res) => {
  try {
    const post = await CommunityPost.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: "Post tidak ditemukan" });
    post.is_pinned = !post.is_pinned;
    await post.save();
    res.json({ msg: `Post ${post.is_pinned ? "di-pin" : "di-unpin"}` });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

// GET /api/admin/categories
router.get("/categories", adminAuth, async (req, res) => {
  try {
    const categories = await FoodCategory.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
