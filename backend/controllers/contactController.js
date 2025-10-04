import Contact from "../models/Contact.js";

/**
 * Create or update global contact info (Admin)
 * If no contact exists, it will create one.
 * If exists, it will update only provided fields.
 */
export const setContact = async (req, res, next) => {
  try {
    const updateData = req.body;

    const contact = await Contact.findOneAndUpdate(
      {},                        // always work on the first (and only) doc
      { $set: updateData },      // only update provided fields
      {
        new: true,               // return updated doc
        upsert: true,            // create if not exists
        setDefaultsOnInsert: true,
      }
    );

    res.status(200).json({
      success: true,
      message: "Contact info saved successfully",
      contact,
    });
  } catch (err) {
    console.error("Error setting contact:", err);
    res.status(500).json({ success: false, message: "Failed to save contact info" });
    next(err);
  }
};

/**
 * Get global contact info (Public)
 */
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne();

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact info not set yet",
      });
    }

    res.status(200).json({
      success: true,
      contact,
    });
  } catch (err) {
    console.error("Error getting contact:", err);
    res.status(500).json({ success: false, message: "Failed to load contact info" });
    next(err);
  }
};
