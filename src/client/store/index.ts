import { RosaClient } from "rosa-client";

import * as Models from "../../models";
export import Models = Models;

import * as Queries from "./queries";
export import Queries = Queries;

import * as Actions from "./actions";
export import Actions = Actions;

export function configureStore() {
  return new RosaClient({
    endpoint: "/sockjs"
  });
}
