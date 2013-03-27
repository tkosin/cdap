package com.continuuity.api.data.batch;

import java.util.HashMap;
import java.util.Map;

/**
 * Handy implementation of the {@link Split}. Acts as a map of attributes.
 */
public class SimpleSplit extends Split {
  private Map<String, String> attributes = new HashMap<String, String>();

  /**
   * Sets attribute
   * @param name name of the attribute
   * @param value value of the attribute
   */
  public void set(String name, String value) {
    attributes.put(name, value);
  }

  /**
   * Gets attribute value
   * @param name name of the attribute to get value of
   * @return value of the attribute
   */
  public String get(String name) {
    return get(name, null);
  }

  /**
   * Gets attribute value
   * @param name name of the attribute to get value of
   * @param defaultValue
   * @return
   */
  public String get(String name, String defaultValue) {
    String value = attributes.get(name);
    return value == null ? defaultValue : value;
  }
}
