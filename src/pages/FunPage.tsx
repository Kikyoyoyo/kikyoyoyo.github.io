import { Gamepad2, Hammer } from "lucide-react";
import { FunCategoryCard } from "../components/FunCategoryCard";
import { BadmintonIcon } from "../components/icons/BadmintonIcon";
import { useDocumentTitle } from "../hooks/useDocumentTitle";

const iconClass = "h-7 w-7";

export function FunPage() {
  useDocumentTitle("Fun — Zheng Chen");

  return (
    <article>
      <h1 className="mb-4 text-3xl font-semibold tracking-tight text-mizuno-900 dark:text-mizuno-50">
        Fun
      </h1>
      <p className="mb-8 text-mizuno-800 dark:text-mizuno-200">
        Sounds like Fun! Pick a category below.
      </p>
      <div className="grid gap-4 sm:grid-cols-3">
        <FunCategoryCard
          to="/fun/games"
          title="Games"
          description="Board games in the browser — two-player, local."
          icon={<Gamepad2 className={iconClass} strokeWidth={1.75} aria-hidden />}
        />
        <FunCategoryCard
          to="/fun/tools"
          title="Tools"
          description="Utilities such as same-LAN file transfer via WebRTC."
          icon={<Hammer className={iconClass} strokeWidth={1.75} aria-hidden />}
        />
        <FunCategoryCard
          to="/fun/sports"
          title="Sports"
          description="Badminton and more — notes and links (coming soon)."
          icon={<BadmintonIcon className={iconClass} strokeWidth={1.75} aria-hidden />}
        />
      </div>
    </article>
  );
}
