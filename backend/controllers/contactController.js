import Contact from "../models/Contact.js";

/**
 * 🟢 Create or Update Global Contact Info
 * - If a contact document exists, update it.
 * - If not, create a new one.
 */
export const setContact = async (req, res, next) => {
  try {
    const updateData = req.body;

    // Ensure arrays are parsed if sent as strings (e.g., from formData)
    ["phone", "email", "address", "socialLinks"].forEach((key) => {
      if (typeof updateData[key] === "string") {
        try {
          updateData[key] = JSON.parse(updateData[key]);
        } catch {
          // fallback — treat as single value
          updateData[key] = [updateData[key]];
        }
      }
    });

    // Update existing or create new
    const contact = await Contact.findOneAndUpdate(
      {},
      { $set: updateData },
      { new: true, upsert: true, setDefaultsOnInsert: true }
    );

    res.status(200).json({
      success: true,
      message: "✅ Contact info saved successfully",
      contact,
    });
  } catch (err) {
    console.error("❌ Error saving contact:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to save contact info" });
    next(err);
  }
};

/**
 * 🟣 Get Global Contact Info
 */
export const getContact = async (req, res, next) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: "Contact info not found",
      });
    }

    res.status(200).json({ success: true, contact });
  } catch (err) {
    console.error("❌ Error fetching contact:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to load contact info" });
    next(err);
  }
};

/**
 * 🟠 Update Contact Info by ID (optional, admin use)
 */
// ✅ updateContact - partial update (does NOT replace whole doc)
export const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updated = await Contact.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: "Contact not found" });
    }

    res.status(200).json({
      success: true,
      message: "Contact info updated successfully",
      contact: updated,
    });
  } catch (err) {
    console.error("Error updating contact:", err);
    res.status(500).json({ success: false, message: "Failed to update contact info" });
  }
};


/**
 * 🔴 Delete Contact Info (optional, admin)
 */
export const deleteContact = async (req, res, next) => {
  try {
    await Contact.deleteMany();
    res.status(200).json({
      success: true,
      message: "🗑️ All contact info deleted successfully",
    });
  } catch (err) {
    console.error("❌ Error deleting contact:", err);
    res.status(500).json({ success: false, message: "Failed to delete contact" });
    next(err);
  }
};
