import { Rosa } from "rosa";
import { Server } from "http";
import { ActionParams, QueryParams } from "rosa-shared";

//- Publications
import List from "./publications/list";
import Counts from "./publications/counts";
import Get from "./publications/get";

//- Actions
import Update from "./actions/update";
import ClearCompleted from "./actions/clear-completed";
import Create from "./actions/create";
import ToggleAll from "./actions/toggle-all";
import Delete from "./actions/delete";

export function createRosa(server: Server) {
  const rosa = Rosa({
    httpServer: server,
    sockjs: {
      prefix: "/sockjs"
    },
    redis: {
      host: "localhost",
      port: 6379
    }
  });

  //- Publications
  rosa.publish(List);

  rosa.publish(Counts);

  rosa.publish(Get);

  //- Actions
  rosa.action(Update);

  rosa.action(Delete);

  rosa.action(ToggleAll);

  rosa.action(ClearCompleted);

  rosa.action(Create);
}
