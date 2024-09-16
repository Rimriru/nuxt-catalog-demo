interface Locale {
  id: number;
  cg_name: string;
  cg_slug: string;
}

interface Level {
  id: number;
  locale: {
    en?: Locale;
    ru?: Locale;
  };
  depth: number;
}

interface ParentLevel extends Level {
  childs: Level[];
}

interface TaskObject {
  page_data: {
    tree: ParentLevel[];
  };
}

export default TaskObject;
