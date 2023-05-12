const prisma = require("../utils/prisma");

const cursorPagination = (modelName, optionsCallback) => {
  return async (req, res, next) => {
    try {
      const { limit, cursor } = req.query;

      // Validate query parameters
      const parsedLimit = parseInt(limit, 10) || 10;

      let parsedCursor;
      if (cursor) {
        parsedCursor = {
          id: parseInt(cursor, 10),
        };
      }

      const options =
        typeof optionsCallback === "function" ? optionsCallback(req) : {};

      const data = await prisma[modelName].findMany({
        take: parsedLimit,
        skip: parsedCursor ? 1 : 0,
        cursor: parsedCursor ? { id: parsedCursor.id } : undefined,
        orderBy: { id: "asc" },
        ...options,
      });

      // Create the next cursor for pagination
      let nextCursor;
      if (data.length > 0) {
        nextCursor = data[data.length - 1].id;
      }

      // Attach pagination metadata to the response
      res.paginatedData = {
        data,
        nextCursor,
      };

      next();
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal server error" });
    }
  };
};

module.exports = cursorPagination;
