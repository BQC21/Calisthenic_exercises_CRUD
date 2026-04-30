
"use client";

import { useState } from "react";
import { RoutineTable } from "@/app/components/Table/Routines/RoutineTable";
import Button2Add from "@/app/components/buttons/Routines/button2Add";
import { useRoutinesMutations, useRoutines } from "@/features/hooks/useRealtimeRoutine";
import type { Routines, RoutinesFormData } from "@/lib/types/exe-types";
import { PortalShell } from "@/app/components/app/PortalShell";
