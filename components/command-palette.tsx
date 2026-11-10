"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import toast from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";
import { BsSearch } from "react-icons/bs";
import { links, projectsData, siteLinks } from "@/lib/data";
import { useActiveSectionContext } from "@/context/active-section-context";
import { useTheme } from "@/context/theme-context";

type Command = {
  id: string;
  group: string;
  label: string;
  run: () => void;
};

const openTab = (url: string) => window.open(url, "_blank", "noopener");

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const { setActiveSection, setTimeOfLastClick } = useActiveSectionContext();
  const { theme, toggleTheme } = useTheme();

  const commands = useMemo<Command[]>(
    () => [
      ...links.map((link) => ({
        id: `go-${link.name}`,
        group: "Go to",
        label: link.name,
        run: () => {
          setActiveSection(link.name);
          setTimeOfLastClick(Date.now());
          document.querySelector(link.hash)?.scrollIntoView({ behavior: "smooth" });
        },
      })),
      ...projectsData.flatMap((project) => [
        ...(project.link
          ? [
              {
                id: `live-${project.title}`,
                group: "Projects",
                label: `${project.title}: open live site`,
                run: () => openTab(project.link),
              },
            ]
          : []),
        {
          id: `code-${project.title}`,
          group: "Projects",
          label: `${project.title}: view code on GitHub`,
          run: () => openTab(project.github),
        },
      ]),
      { id: "github", group: "Links", label: "GitHub profile", run: () => openTab(siteLinks.github) },
      { id: "linkedin", group: "Links", label: "LinkedIn profile", run: () => openTab(siteLinks.linkedin) },
      {
        id: "email",
        group: "Links",
        label: "Copy email address",
        run: () => {
          navigator.clipboard
            .writeText(siteLinks.email)
            .then(() => toast.success("Email address copied"))
            .catch(() => toast.error("Could not copy the email address"));
        },
      },
      { id: "resume", group: "Links", label: "Download resume", run: () => openTab(siteLinks.resume) },
      {
        id: "theme",
        group: "Actions",
        label: theme === "light" ? "Switch to dark theme" : "Switch to light theme",
        run: toggleTheme,
      },
    ],
    [theme, toggleTheme, setActiveSection, setTimeOfLastClick]
  );

  const results = useMemo(() => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    return commands.filter((command) => {
      // Match from the start of a word, so "pen" finds PEN.AI but not "open".
      const tokens = `${command.group} ${command.label}`.toLowerCase().split(/[^a-z0-9.]+/);
      return words.every((word) => tokens.some((token) => token.startsWith(word)));
    });
  }, [commands, query]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((value) => !value);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) return;
    setQuery("");
    setIndex(0);
    const previous = document.activeElement as HTMLElement | null;
    inputRef.current?.focus();
    return () => previous?.focus?.();
  }, [open]);

  useEffect(() => {
    listRef.current
      ?.querySelector('[aria-selected="true"]')
      ?.scrollIntoView({ block: "nearest" });
  }, [index, results]);

  const runCommand = (command: Command | undefined) => {
    if (!command) return;
    setOpen(false);
    command.run();
  };

  const onInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i + 1) % results.length : 0));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (results.length ? (i - 1 + results.length) % results.length : 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      runCommand(results[index]);
    } else if (e.key === "Escape") {
      setOpen(false);
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open the command menu (Ctrl+K)"
        title="Command menu (Ctrl+K)"
        onClick={() => setOpen(true)}
        className="fixed bottom-[5.5rem] right-5 bg-white/80 w-[3rem] h-[3rem] backdrop-blur-[0.5rem] border border-white/40 shadow-2xl rounded-full flex items-center justify-center hover:scale-[1.15] active:scale-105 transition-all dark:bg-gray-950"
      >
        <BsSearch />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[1000] flex items-start justify-center bg-black/30 px-4 pt-[15vh] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onMouseDown={(e) => {
              if (e.target === e.currentTarget) setOpen(false);
            }}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command menu"
              className="w-full max-w-[32rem] overflow-hidden rounded-2xl border border-black/10 bg-white shadow-2xl dark:border-white/10 dark:bg-gray-900"
              initial={{ scale: 0.96, y: -8 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.96, y: -8 }}
              transition={{ duration: 0.15 }}
            >
              <div className="flex items-center gap-3 border-b border-black/10 px-4 dark:border-white/10">
                <BsSearch className="shrink-0 text-gray-500" aria-hidden="true" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => {
                    setQuery(e.target.value);
                    setIndex(0);
                  }}
                  onKeyDown={onInputKeyDown}
                  placeholder="Jump to a section, project or link"
                  role="combobox"
                  aria-expanded="true"
                  aria-controls="command-list"
                  aria-activedescendant={results[index] ? `cmd-${results[index].id}` : undefined}
                  className="h-12 w-full bg-transparent text-gray-950 outline-none placeholder:text-gray-500 dark:text-white"
                />
                <kbd className="shrink-0 rounded border border-black/10 px-1.5 py-0.5 text-xs text-gray-500 dark:border-white/20">
                  Esc
                </kbd>
              </div>

              <ul
                ref={listRef}
                id="command-list"
                role="listbox"
                className="max-h-[50vh] overflow-y-auto p-2"
              >
                {results.length === 0 && (
                  <li className="px-3 py-6 text-center text-sm text-gray-500">
                    Nothing matches &ldquo;{query}&rdquo;.
                  </li>
                )}
                {results.map((command, i) => (
                  <React.Fragment key={command.id}>
                    {(i === 0 || results[i - 1].group !== command.group) && (
                      <li
                        role="presentation"
                        className="px-3 pb-1 pt-3 text-xs font-medium uppercase tracking-wider text-gray-500"
                      >
                        {command.group}
                      </li>
                    )}
                    <li
                      id={`cmd-${command.id}`}
                      role="option"
                      aria-selected={i === index}
                      onMouseMove={() => setIndex(i)}
                      onClick={() => runCommand(command)}
                      className={clsx(
                        "cursor-pointer rounded-lg px-3 py-2 text-[0.95rem] text-gray-800 dark:text-gray-200",
                        i === index && "bg-gray-100 dark:bg-white/10"
                      )}
                    >
                      {command.label}
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
