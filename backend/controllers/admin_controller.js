import User from "../models/User.js";
import Chat from "../models/Chat.js";

// ====== Admin Metrics (ONLY TOTAL USERS + CHART DATA) ======
export const getAdminMetrics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();

    // last 7 days messages
    const now = new Date();
    const days = 7;
    const timeSeries = [];

    for (let i = days - 1; i >= 0; i--) {
      const dayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
      const dayEnd = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i + 1);

      const agg = await Chat.aggregate([
        { $unwind: "$messages" },
        { $match: { "messages.timestamp": { $gte: dayStart, $lt: dayEnd } } },
        { $group: { _id: null, count: { $sum: 1 } } }
      ]);

      timeSeries.push({
        date: dayStart.toISOString().split("T")[0],
        totalMessages: agg[0]?.count || 0
      });
    }

    res.json({
      totalUsers,
      timeSeries
    });
  } catch (err) {
    console.error("getAdminMetrics error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ====== User List for Admin ======
export const getAdminUsers = async (req, res) => {
  try {
    const users = await User.find({})
      .select("firstName lastName username email role createdAt updatedAt")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (err) {
    console.error("getAdminUsers error:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
