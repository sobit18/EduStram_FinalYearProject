import Teacher from "../models/Teacher.js";

export const checkGoogleStatus = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.teacherId);
    if (!teacher || !teacher.tokens?.accessToken) {
      return res.json({ connected: false });
    }
    return res.json({ connected: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ connected: false });
  }
};

