interface Locale {
  cg_name: string;
  cg_slug: string;
}

interface ProductLocale {
  en?: ItemLocale;
  ru?: ItemLocale;
}

interface Level {
  id: number;
  locale: ProductLocale;
  depth: number;
}

interface ParentLevel extends Level {
  childs: Level[];
  path_to_top?: Level[];
}

interface CategoryType extends ParentLevel {
  parent: Level;
}

interface TaskObject {
  page_data: {
    tree: ParentLevel[];
  };
}

export { ProductLocale, Level, ParentLevel, CategoryType, TaskObject };
