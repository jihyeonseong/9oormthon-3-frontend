"use client";

import { Sheet } from "@vapor-ui/core";
import { MissionGuideList } from "./MissionGuideList";
import DragHandleImage from "../assets/images/drag-handle-image.png";
import { useState } from "react";

export default function MissionGuideSheet() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSheet = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <Sheet.Root open modal={false}>
      <Sheet.PortalPrimitive>
        <Sheet.PositionerPrimitive
          side="bottom"
          style={{ transitionDuration: "0.5s" }}
          className="bg-transparent pointer-events-none"
        >
          <Sheet.PopupPrimitive
            style={{ transitionDuration: "0.5s" }}
            className="bg-transparent shadow-none overflow-y-auto no-scrollbar h-auto "
          >
            <div
              className={`pointer-events-auto
                  mx-auto flex w-full max-w-[375px] flex-col rounded-t-3xl bg-white
                  transition-transform duration-300 ease-out
                  ${isExpanded ? "translate-y-0" : "translate-y-[90%]"}
                `}
              style={{
                boxShadow: "0 -6px 12px rgba(0, 0, 0, 0.08)",
              }}
            >
              <div
                className="mx-auto flex w-full max-w-[375px] flex-col rounded-t-3xl bg-white"
                style={{
                  boxShadow: "0 -6px 12px rgba(0, 0, 0, 0.08)",
                }}
              >
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleSheet();
                  }}
                  className="flex w-full justify-center pt-5 pb-7 bg-transparent border-none outline-none"
                >
                  <img
                    src={DragHandleImage}
                    alt="시트바 버튼이미지"
                    className="h-1.5 w-14"
                  />
                </button>
              </div>
              <MissionGuideList />
            </div>
          </Sheet.PopupPrimitive>
        </Sheet.PositionerPrimitive>
      </Sheet.PortalPrimitive>
    </Sheet.Root>
  );
}
