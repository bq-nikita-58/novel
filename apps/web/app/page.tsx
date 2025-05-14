'use client';

import { useState } from "react";
import TailwindAdvancedEditor from "@/components/tailwind/advanced-editor";
import Sidebar from "@/components/tailwind/ui/sidebar";
import { Button } from "@/components/tailwind/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/tailwind/ui/dialog";
import Menu from "@/components/tailwind/ui/menu";
import { ScrollArea } from "@/components/tailwind/ui/scroll-area";
import { BookOpen, GithubIcon } from "lucide-react";
import Link from "next/link";

export default function Page() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  return (
    <div className="flex min-h-screen">
      {/* Add Sidebar*/}
      <Sidebar onSelect={setSelectedId} />

      <div className="w-full min-h-screen flex flex-col items-center gap-4 py-4 sm:px-5">
      <div className="flex w-full max-w-screen-lg items-center gap-2 px-4 sm:mb-[calc(20vh)]">
          <Button size="icon" variant="outline">
            <a href="https://github.com/steven-tey/novel" target="_blank" rel="noreferrer">
              <GithubIcon />
            </a>
          </Button>
          <Dialog>
            <DialogTrigger asChild>
              <Button className="ml gap-2">
                <BookOpen className="h-4 w-4" />
                Usage in dialog
              </Button>
            </DialogTrigger>
            <DialogContent className="flex max-w-3xl h-[calc(100vh-24px)]">
              <ScrollArea className="max-h-screen">
                <TailwindAdvancedEditor editorId={selectedId} />
              </ScrollArea>
            </DialogContent>
          </Dialog>
          <Link href="/docs" className="ml-auto">
            <Button variant="ghost">Documentation</Button>
          </Link>
          <Menu />
        </div>

        <TailwindAdvancedEditor editorId={selectedId} />
      </div>
    </div>
  );
}
