package com.continuuity.gateway.dataset;

import com.continuuity.common.http.core.HttpResponder;
import com.continuuity.gateway.auth.GatewayAuthenticator;
import com.continuuity.gateway.v2.handlers.AuthenticatedHttpHandler;
import com.continuuity.metadata.MetadataService;
import com.continuuity.metadata.thrift.Account;
import com.continuuity.metadata.thrift.Application;
import com.continuuity.metadata.thrift.Dataset;
import com.continuuity.metadata.thrift.Flow;
import com.continuuity.metadata.thrift.Mapreduce;
import com.continuuity.metadata.thrift.Query;
import com.continuuity.metadata.thrift.Stream;
import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.inject.Inject;
import org.jboss.netty.handler.codec.http.HttpRequest;
import org.jboss.netty.handler.codec.http.HttpResponseStatus;

import javax.ws.rs.GET;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import java.util.List;

/**
 *  {@link MetadataServiceHandler} is REST interface to MDS store.
 */
@Path("/rest/v2")
public class MetadataServiceHandler extends AuthenticatedHttpHandler {
  private final MetadataService service;

  @Inject
  public MetadataServiceHandler(MetadataService service, GatewayAuthenticator authenticator) {
    super(authenticator);
    this.service = service;
  }

  /**
   * Returns a list of streams associated with account.
   */
  @GET
  @Path("/streams")
  public void getStreams(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Stream> streams = service.getStreams(new Account(accountId));
      JsonArray s = new JsonArray();
      for (Stream stream : streams) {
        JsonObject object = new JsonObject();
        object.addProperty("id", stream.getId());
        object.addProperty("name", stream.getName());
        object.addProperty("description", stream.getDescription());
        object.addProperty("expiry", stream.getExpiryInSeconds());
        object.addProperty("capacity", stream.getCapacityInBytes());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of streams associated with application.
   */
  @GET
  @Path("/apps/{appId}/streams")
  public void getStreamsByApp(HttpRequest request, HttpResponder responder,
                              @PathParam("appId") final String appId) {

    if (appId.isEmpty()) {
      responder.sendStatus(HttpResponseStatus.BAD_REQUEST);
      return;
    }

    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Stream> streams = service.getStreamsByApplication(accountId, appId);
      if (streams.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Stream stream : streams) {
        JsonObject object = new JsonObject();
        object.addProperty("id", stream.getId());
        object.addProperty("name", stream.getName());
        object.addProperty("description", stream.getDescription());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of dataset associated with account.
   */
  @GET
  @Path("/datasets")
  public void getDatasets(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Dataset> datasets = service.getDatasets(new Account(accountId));
      JsonArray s = new JsonArray();
      if (datasets.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      for (Dataset dataset : datasets) {
        JsonObject object = new JsonObject();
        object.addProperty("id", dataset.getId());
        object.addProperty("name", dataset.getName());
        object.addProperty("description", dataset.getDescription());
        object.addProperty("type", dataset.getType());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of dataset associated with application.
   */
  @GET
  @Path("/apps/{appId}/datasets")
  public void getDatasetsByApp(HttpRequest request, HttpResponder responder,
                               @PathParam("appId") final String appId) {
    if (appId.isEmpty()) {
      responder.sendStatus(HttpResponseStatus.BAD_REQUEST);
      return;
    }

    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Dataset> datasets = service.getDatasetsByApplication(accountId, appId);
      if (datasets.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Dataset dataset : datasets) {
        JsonObject object = new JsonObject();
        object.addProperty("id", dataset.getId());
        object.addProperty("name", dataset.getName());
        object.addProperty("description", dataset.getDescription());
        object.addProperty("type", dataset.getType());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of queries associated with account.
   */
  @GET
  @Path("/queries")
  public void getQueries(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Query> queries = service.getQueries(new Account(accountId));
      if (queries.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Query query : queries) {
        JsonObject object = new JsonObject();
        object.addProperty("id", query.getId());
        object.addProperty("name", query.getName());
        object.addProperty("description", query.getDescription());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of queries associated with account & application.
   */
  @GET
  @Path("/apps/{appId}/queries")
  public void getQueriesByApp(HttpRequest request, HttpResponder responder,
                              @PathParam("appId") final String appId) {
    if (appId.isEmpty()) {
      responder.sendStatus(HttpResponseStatus.BAD_REQUEST);
      return;
    }

    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Query> queries = service.getQueriesByApplication(accountId, appId);
      if (queries.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Query query : queries) {
        JsonObject object = new JsonObject();
        object.addProperty("id", query.getId());
        object.addProperty("name", query.getName());
        object.addProperty("description", query.getDescription());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of mapreduce jobs associated with account.
   */
  @GET
  @Path("/mapreduces")
  public void getMapReduces(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Mapreduce> mapreduces = service.getMapreduces(new Account(accountId));
      if (mapreduces.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Mapreduce mapreduce : mapreduces) {
        JsonObject object = new JsonObject();
        object.addProperty("id", mapreduce.getId());
        object.addProperty("name", mapreduce.getName());
        object.addProperty("description", mapreduce.getDescription());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of mapreduce jobs associated with account & application.
   */
  @GET
  @Path("/apps/{appId}/mapreduces")
  public void getMapReducesByApp(HttpRequest request, HttpResponder responder,
                                 @PathParam("appId") final String appId) {

    if (appId.isEmpty()) {
      responder.sendStatus(HttpResponseStatus.BAD_REQUEST);
      return;
    }

    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Mapreduce> mapreduces = service.getMapreduces(new Account(accountId));
      if (mapreduces.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Mapreduce mapreduce : mapreduces) {
        JsonObject object = new JsonObject();
        object.addProperty("id", mapreduce.getId());
        object.addProperty("name", mapreduce.getName());
        object.addProperty("description", mapreduce.getDescription());
        object.addProperty("app", mapreduce.getApplication());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of applications associated with account.
   */
  @GET
  @Path("/apps")
  public void getApps(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);

      List<Application> apps = service.getApplications(new Account(accountId));
      if (apps.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Application app : apps) {
        JsonObject object = new JsonObject();
        object.addProperty("id", app.getId());
        object.addProperty("name", app.getName());
        object.addProperty("description", app.getDescription());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of flows associated with account.
   */
  @GET
  @Path("/flows")
  public void getFlows(HttpRequest request, HttpResponder responder) {
    try {
      String accountId = getAuthenticatedAccountId(request);

      List<Flow> flows = service.getFlows(accountId);
      if (flows.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Flow flow : flows) {
        JsonObject object = new JsonObject();
        object.addProperty("id", flow.getId());
        object.addProperty("name", flow.getName());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }

  /**
   * Returns a list of flow associated with account & application.
   */
  @GET
  @Path("/apps/{appId}/flows")
  public void getFlowsByApp(HttpRequest request, HttpResponder responder,
                            @PathParam("appId") final String appId) {

    if (appId.isEmpty()) {
      responder.sendStatus(HttpResponseStatus.BAD_REQUEST);
      return;
    }

    try {
      String accountId = getAuthenticatedAccountId(request);
      List<Flow> flows = service.getFlowsByApplication(accountId, appId);
      if (flows.size() < 1) {
        responder.sendStatus(HttpResponseStatus.NOT_FOUND);
        return;
      }
      JsonArray s = new JsonArray();
      for (Flow flow : flows) {
        JsonObject object = new JsonObject();
        object.addProperty("id", flow.getId());
        object.addProperty("name", flow.getName());
        s.add(object);
      }
      responder.sendJson(HttpResponseStatus.OK, s);
    } catch (SecurityException e) {
      responder.sendStatus(HttpResponseStatus.FORBIDDEN);
    } catch (IllegalArgumentException e) {
      responder.sendStatus(HttpResponseStatus.NOT_FOUND);
    } catch (Exception e) {
      responder.sendStatus(HttpResponseStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
