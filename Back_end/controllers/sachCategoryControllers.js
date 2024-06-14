import SachCategory from "../models/SachCategory";

export const createCatgory = async (req, res, next) => {
  try {
    const { title } = req.body;

    const sachCategory = new SachCategory({
      title,
    });

    const savesachCategory = await sachCategory.save();
    return res.json(savesachCategory);
  } catch (error) {
    next(error);
  }
};

export const getAllCategory = async (req, res, next) => {
  try {
    let query = {};

    if (req.query.searchCategory) {
      query.title = { $regex: req.query.searchCategory, $options: "i" };
    }
    const sachCategory = await SachCategory.find(query);

    return res.json(sachCategory);
  } catch (error) {
    next(error);
  }
};
export const getCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const sachCategory = await SachCategory.findById(categoryId);

    if (!sachCategory) {
      return res.status(404).json({ message: "Không tìm thấy" });
    }

    return res.json(sachCategory);
  } catch (error) {
    next(error);
  }
};
export const updateCategorySach = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const { title } = req.body;

    const updatedCategory = await SachCategory.findByIdAndUpdate(
      categoryId,
      { title },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Không tìm thấy" });
    }

    return res.json(updatedCategory);
  } catch (error) {
    next(error);
  }
};
export const deleteCategory = async (req, res, next) => {
  try {
    const { categoryId } = req.params;

    const deletedCategory = await SachCategory.findByIdAndDelete(categoryId);

    if (!deletedCategory) {
      return res.status(404).json({ message: "Không tìm thấy" });
    }

    return res.json({ message: "Xóa thành công" });
  } catch (error) {
    next(error);
  }
};
