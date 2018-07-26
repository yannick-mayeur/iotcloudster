package de.uniks.iot.repository.search;

import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Configuration;

/**
 * Configure a Mock version of DeviceSearchRepository to test the
 * application without starting Elasticsearch.
 */
@Configuration
public class DeviceSearchRepositoryMockConfiguration {

    @MockBean
    private DeviceSearchRepository mockDeviceSearchRepository;

}
