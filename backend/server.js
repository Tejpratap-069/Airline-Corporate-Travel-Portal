/**
 * SkyCorp Travel - Express REST API backend
 *
 * Replaces the json-server mock with a real Express server.
 * It serves the exact same REST routes the React frontend already
 * calls (see src/api/api.js, baseURL http://localhost:3001), so the
 * frontend works unchanged - just start this server instead of
 * json-server.
 *
 * Data is persisted to data/db.json (write-through on every change),
 * seeded from the project's original db.json.
 */

const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, "data", "db.json");

// ---------------------------------------------------------------- load data
let db;
try {
  db = JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
} catch (err) {
  console.error(`Could not read data file ${DATA_FILE}: ${err.message}`);
  process.exit(1);
}

// Only array-valued top-level keys become REST resources
// (metadata keys such as "$schema" are ignored).
const resources = Object.keys(db).filter((key) => Array.isArray(db[key]));

// ------------------------------------------------------------- persistence
// Every mutation is written back to data/db.json (atomic tmp + rename),
// queued so concurrent requests can never corrupt the file.
let writeQueue = Promise.resolve();
function persist() {
  writeQueue = writeQueue.then(async () => {
    const tmp = DATA_FILE + ".tmp";
    await fs.promises.writeFile(tmp, JSON.stringify(db, null, 2));
    await fs.promises.rename(tmp, DATA_FILE);
  });
  return writeQueue;
}

// ------------------------------------------------------------------ helpers
function findIndex(resource, id) {
  return db[resource].findIndex((item) => String(item.id) === String(id));
}

// Generates the next id in the collection's own style:
//   TRIP001, TRIP002 ... -> TRIP015 style (prefix + zero-padded number)
//   "1", "2", "3" ....... -> next number as a string
//   anything else ....... -> random string id (same as json-server)
function nextId(resource) {
  const ids = db[resource].map((item) => String(item.id ?? ""));

  if (ids.length && ids.every((id) => /^\d+$/.test(id))) {
    return String(Math.max(...ids.map((id) => parseInt(id, 10))) + 1);
  }

  const pattern = /^([A-Za-z]+)(\d+)$/;
  const groups = {};
  for (const id of ids) {
    const m = pattern.exec(id);
    if (m) {
      const [, prefix, num] = m;
      if (!groups[prefix]) groups[prefix] = { max: 0, width: num.length };
      groups[prefix].max = Math.max(groups[prefix].max, parseInt(num, 10));
      groups[prefix].width = Math.max(groups[prefix].width, num.length);
    }
  }
  const prefixes = Object.keys(groups);
  if (prefixes.length === 1) {
    const p = prefixes[0];
    return p + String(groups[p].max + 1).padStart(groups[p].width, "0");
  }

  return Math.random().toString(36).slice(2, 9) + Date.now().toString(36);
}

// ---------------------------------------------------------------------- app
const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    name: "SkyCorp Travel API",
    status: "running",
    resources: resources.map((r) => `/${r}`),
  });
});

for (const resource of resources) {
  // GET /resource            -> full list (supports ?field=value filters)
  app.get(`/${resource}`, (req, res) => {
    let items = db[resource];
    const filters = Object.entries(req.query).filter(
      ([key]) => !key.startsWith("_")
    );
    if (filters.length) {
      items = items.filter((item) =>
        filters.every(([key, value]) => String(item[key]) === value)
      );
    }
    res.json(items);
  });

  // GET /resource/:id        -> single item
  app.get(`/${resource}/:id`, (req, res) => {
    const idx = findIndex(resource, req.params.id);
    if (idx === -1)
      return res.status(404).json({ error: `${resource} item not found` });
    res.json(db[resource][idx]);
  });

  // POST /resource           -> create (201)
  app.post(`/${resource}`, async (req, res) => {
    const item = { ...req.body };
    if (item.id === undefined || item.id === null || item.id === "") {
      item.id = nextId(resource);
    }
    if (findIndex(resource, item.id) !== -1) {
      item.id = nextId(resource);
    }
    db[resource].push(item);
    await persist();
    res.status(201).json(item);
  });

  // PATCH /resource/:id      -> partial update
  app.patch(`/${resource}/:id`, async (req, res) => {
    const idx = findIndex(resource, req.params.id);
    if (idx === -1)
      return res.status(404).json({ error: `${resource} item not found` });
    db[resource][idx] = {
      ...db[resource][idx],
      ...req.body,
      id: db[resource][idx].id,
    };
    await persist();
    res.json(db[resource][idx]);
  });

  // PUT /resource/:id        -> full replace
  app.put(`/${resource}/:id`, async (req, res) => {
    const idx = findIndex(resource, req.params.id);
    if (idx === -1)
      return res.status(404).json({ error: `${resource} item not found` });
    db[resource][idx] = { ...req.body, id: db[resource][idx].id };
    await persist();
    res.json(db[resource][idx]);
  });

  // DELETE /resource/:id     -> remove
  app.delete(`/${resource}/:id`, async (req, res) => {
    const idx = findIndex(resource, req.params.id);
    if (idx === -1)
      return res.status(404).json({ error: `${resource} item not found` });
    const [removed] = db[resource].splice(idx, 1);
    await persist();
    res.json(removed);
  });
}

app.use((req, res) => res.status(404).json({ error: "Route not found" }));

app.listen(PORT, () => {
  console.log(`SkyCorp Travel API running at http://localhost:${PORT}`);
  console.log(`Resources: ${resources.map((r) => "/" + r).join(", ")}`);
});
