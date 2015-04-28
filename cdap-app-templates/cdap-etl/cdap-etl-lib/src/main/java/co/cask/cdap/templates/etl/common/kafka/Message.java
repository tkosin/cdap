package co.cask.cdap.templates.etl.common.kafka;

import java.io.IOException;

/**
 * Created by michaelandrepearce on 05/04/15.
 */
public interface Message {
    byte[] getPayload();

    byte[] getKey();

    String getTopic();

    long getOffset();

    int getPartition();

    long getChecksum();

    void validate() throws IOException;
}
