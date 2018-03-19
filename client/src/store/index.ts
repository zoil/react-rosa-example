import { RosaClient } from "rosa-client";

import * as Models from "../../../shared/store/models";
export import Models = Models;

import * as Queries from "./queries";
export import Queries = Queries;

import * as Actions from "./actions";
export import Actions = Actions;

export function configureStore() {
  return new RosaClient({
    endpoint: "http://127.0.0.1:8888/sockjs"
  });
}
